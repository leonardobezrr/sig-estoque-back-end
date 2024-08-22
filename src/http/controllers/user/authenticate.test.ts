import { describe, it, expect, vi } from "vitest";
import { authenticateUser } from "./authenticate";
import { FastifyReply, FastifyRequest } from "fastify";
import { InvalidCredentialError } from "../../../services/errors/invalid-credential-error";
import { makeUserAuthenticateService } from "../../../services/factories/user/make-user-authenticate-service";

vi.mock("../../../services/factories/user/make-user-authenticate-service");

describe("authenticateUser Controller", () => {
  const mockRequest = {
    body: {
      email: "test@example.com",
      password: "password123"
    }
  } as FastifyRequest;

  const mockReply = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn().mockReturnThis(),
    jwtSign: vi.fn().mockResolvedValue("mockToken")
  } as unknown as FastifyReply;

  it("should authenticate the user and return a token", async () => {
    const mockService = {
      execute: vi.fn().mockResolvedValue({
        user: {
          id: "user-id",
          role: "user"
        }
      })
    };

    (makeUserAuthenticateService as any).mockReturnValue(mockService);

    await authenticateUser(mockRequest, mockReply);

    expect(mockService.execute).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123"
    });
    expect(mockReply.jwtSign).toHaveBeenCalledWith(
      { role: "user" },
      { sign: { sub: "user-id" } }
    );
    expect(mockReply.status).toHaveBeenCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith({
      id: "user-id",
      role: "user",
      token: "mockToken"
    });
  });

  it("should return 400 if credentials are invalid", async () => {
    const mockService = {
      execute: vi.fn().mockRejectedValue(new InvalidCredentialError())
    };

    (makeUserAuthenticateService as any).mockReturnValue(mockService);

    await authenticateUser(mockRequest, mockReply);

    expect(mockReply.status).toHaveBeenCalledWith(400);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: "Invalid credentials."
    });
  });

  it("should throw an error if an unknown error occurs", async () => {
    const mockService = {
      execute: vi.fn().mockRejectedValue(new Error("Unknown error"))
    };

    (makeUserAuthenticateService as any).mockReturnValue(mockService);

    await expect(authenticateUser(mockRequest, mockReply)).rejects.toThrow("Unknown error");
  });
});

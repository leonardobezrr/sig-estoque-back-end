import { describe, it, expect, vi } from "vitest";
import { findUserByid } from "./find-by-id";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserByIdService } from "../../../services/factories/user/make-get-user-by-id";

vi.mock("../../../services/factories/user/make-get-user-by-id");

describe("findUserByid Controller", () => {
  const mockRequest = (params: { id: string }) => ({
    params: params
  }) as FastifyRequest;

  const mockReply = {
    code: vi.fn().mockReturnThis(),
    send: vi.fn().mockReturnThis(),
    status: vi.fn().mockReturnThis()
  } as unknown as FastifyReply;

  it("should return the user successfully", async () => {
    const mockService = {
      execute: vi.fn().mockResolvedValue({
        user: { id: "user1", name: "User One" }
      })
    };

    (makeGetUserByIdService as any).mockReturnValue(mockService);

    const request = mockRequest({ id: "user1" });

    await findUserByid(request, mockReply);

    expect(mockService.execute).toHaveBeenCalledWith({ userId: "user1" });
    expect(mockReply.code).toHaveBeenCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith({
      user: { id: "user1", name: "User One" }
    });
  });

  it("should return 404 if the user is not found", async () => {
    const mockService = {
      execute: vi.fn().mockResolvedValue({ user: null })
    };

    (makeGetUserByIdService as any).mockReturnValue(mockService);

    const request = mockRequest({ id: "user1" });

    await findUserByid(request, mockReply);

    expect(mockService.execute).toHaveBeenCalledWith({ userId: "user1" });
    expect(mockReply.status).toHaveBeenCalledWith(404);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: "User not found"
    });
  });

  it("should return 500 if an error occurs", async () => {
    const mockService = {
      execute: vi.fn().mockRejectedValue(new Error("Unknown error"))
    };

    (makeGetUserByIdService as any).mockReturnValue(mockService);

    const request = mockRequest({ id: "user1" });

    await findUserByid(request, mockReply);

    expect(mockService.execute).toHaveBeenCalledWith({ userId: "user1" });
    expect(mockReply.status).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: "Internal Server Error"
    });
  });
});

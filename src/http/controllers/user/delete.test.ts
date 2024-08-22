import { describe, it, expect, vi } from "vitest";
import { deleteUser } from "./delete";
import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "../../../services/errors/resource-not-found-error";
import { makeDeleteUserService } from "../../../services/factories/user/make-delete-user-service";

vi.mock("../../../services/factories/user/make-delete-user-service");

describe("deleteUser Controller", () => {
  const mockRequest = {
    params: {
      id: "user-id"
    }
  } as FastifyRequest;

  const mockReply = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn().mockReturnThis()
  } as unknown as FastifyReply;

  it("should delete the user and return a success message", async () => {
    const mockService = {
      execute: vi.fn().mockResolvedValue(undefined)
    };

    (makeDeleteUserService as any).mockReturnValue(mockService);

    await deleteUser(mockRequest, mockReply);

    expect(mockService.execute).toHaveBeenCalledWith({ id: "user-id" });
    expect(mockReply.status).toHaveBeenCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: "User successfully deleted."
    });
  });

  it("should return 404 if the user is not found", async () => {
    const mockService = {
      execute: vi.fn().mockRejectedValue(new ResourceNotFoundError("User not found"))
    };

    (makeDeleteUserService as any).mockReturnValue(mockService);

    await deleteUser(mockRequest, mockReply);

    expect(mockReply.status).toHaveBeenCalledWith(404);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: "User not found"
    });
  });

  it("should return 500 if an unknown error occurs", async () => {
    const mockService = {
      execute: vi.fn().mockRejectedValue(new Error("Unknown error"))
    };

    (makeDeleteUserService as any).mockReturnValue(mockService);

    await deleteUser(mockRequest, mockReply);

    expect(mockReply.status).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: "Internal Server Error"
    });
  });
});

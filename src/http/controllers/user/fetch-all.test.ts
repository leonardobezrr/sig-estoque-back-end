import { describe, it, expect, vi } from "vitest";
import { fetchAllUsers } from "./fetch-all";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetAllUsersService } from "../../../services/factories/user/make-get-all-users-service";

vi.mock("../../../services/factories/user/make-get-all-users-service");

describe("fetchAllUsers Controller", () => {
  const mockRequest = {} as FastifyRequest;
  
  const mockReply = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn().mockReturnThis()
  } as unknown as FastifyReply;

  it("should return all users successfully", async () => {
    const mockService = {
      execute: vi.fn().mockResolvedValue({
        users: [{ id: "user1", name: "User One" }, { id: "user2", name: "User Two" }]
      })
    };

    (makeGetAllUsersService as any).mockReturnValue(mockService);

    await fetchAllUsers(mockRequest, mockReply);

    expect(mockService.execute).toHaveBeenCalled();
    expect(mockReply.status).toHaveBeenCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith({
      users: [{ id: "user1", name: "User One" }, { id: "user2", name: "User Two" }]
    });
  });

  it("should return 500 if an error occurs", async () => {
    const mockService = {
      execute: vi.fn().mockRejectedValue(new Error("Unknown error"))
    };

    (makeGetAllUsersService as any).mockReturnValue(mockService);

    await fetchAllUsers(mockRequest, mockReply);

    expect(mockReply.status).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: "Internal Server Error"
    });
  });
});

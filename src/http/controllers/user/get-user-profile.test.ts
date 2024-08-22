import { describe, it, expect, vi } from "vitest";
import { profile } from "./get-user-profile";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserProfileService } from "../../../services/factories/user/make-get-user-profile-service";
import { makeFindManagerByUserIdService } from "../../../services/factories/manager/make-find-manager-by-user-id-service";
import { ResourceNotFoundError } from "../../../services/errors/resource-not-found-error";

vi.mock("../../../services/factories/user/make-get-user-profile-service");
vi.mock("../../../services/factories/manager/make-find-manager-by-user-id-service");

describe("profile Controller", () => {
  const mockRequest = (user: { sub: string }) => ({
    user,
    jwtVerify: vi.fn().mockResolvedValue(null)
  }) as FastifyRequest;

  const mockReply = {
    code: vi.fn().mockReturnThis(),
    send: vi.fn().mockReturnThis(),
    status: vi.fn().mockReturnThis()
  } as unknown as FastifyReply;

  it("should return user profile and manager if the user is a manager", async () => {
    const mockGetUserProfileService = {
      execute: vi.fn().mockResolvedValue({
        user: { id: "user1", role: "MANAGER" }
      })
    };

    const mockFindManagerByUserIdService = {
      execute: vi.fn().mockResolvedValue({
        id: "user1",
        name: "Manager One"
      })
    };

    (makeGetUserProfileService as any).mockReturnValue(mockGetUserProfileService);
    (makeFindManagerByUserIdService as any).mockReturnValue(mockFindManagerByUserIdService);

    const request = mockRequest({ sub: "user1" });

    await profile(request, mockReply);

    expect(mockGetUserProfileService.execute).toHaveBeenCalledWith({
      userId: "user1"
    });

    expect(mockFindManagerByUserIdService.execute).toHaveBeenCalledWith({
      userId: "user1"
    });

    expect(mockReply.status).toHaveBeenCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith({
      user: { id: "user1", role: "MANAGER" },
      switchedUser: { id: "user1", name: "Manager One" }
    });
  });

  it("should return 404 if the role is not found", async () => {
    const mockGetUserProfileService = {
      execute: vi.fn().mockResolvedValue({
        user: { id: "user1", role: "UNKNOWN_ROLE" }
      })
    };

    (makeGetUserProfileService as any).mockReturnValue(mockGetUserProfileService);

    const request = mockRequest({ sub: "user1" });

    await profile(request, mockReply);

    expect(mockGetUserProfileService.execute).toHaveBeenCalledWith({
      userId: "user1"
    });

    expect(mockReply.status).toHaveBeenCalledWith(404);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: "Resource not found"
    });
  });

  it("should return 500 if an error occurs", async () => {
    const mockGetUserProfileService = {
      execute: vi.fn().mockRejectedValue(new Error("Unknown error"))
    };

    (makeGetUserProfileService as any).mockReturnValue(mockGetUserProfileService);

    const request = mockRequest({ sub: "user1" });

    await profile(request, mockReply);

    expect(mockGetUserProfileService.execute).toHaveBeenCalledWith({
      userId: "user1"
    });

    expect(mockReply.status).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: "Internal Server Error"
    });
  });
});

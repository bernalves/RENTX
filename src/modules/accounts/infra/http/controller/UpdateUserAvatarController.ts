import { UpdateUserAvatarService } from "@modules/accounts/services/UpdateUserAvatarService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const avFile = request.file.filename;

    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    await updateUserAvatarService.execute({ userId: id, avatarFile: avFile });

    return response
      .status(204)
      .json({ message: "Avatar file imported sucessfuly." });
  }
}

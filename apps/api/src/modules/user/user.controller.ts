import { Request } from "express";
import { Controller, Get, Req } from "@nestjs/common";

import { UserService } from "@/modules/user/user.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get("me")
  getProfile(@Req() req: Request) {
    return req.user;
  }
}

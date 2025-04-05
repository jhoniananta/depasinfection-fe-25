import { Event } from "./event-register";
import { Role } from "./role";

export type UserRegisterRequest = {
  email: string;
  password: string;
  full_name: string;
  phone_number: string;
};

export type UserRegisterResponse = {
  account_id: string;
  email: string;
  full_name: string;
  phone_number: string;
  role: Role;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type UserLoginResponse = {
  account_id: string;
  email: string;
  nama: string;
  phone_number: string;
  role: Role;
  events: Array<Event>;
  token: string;
};

export type getMeUserResponse = {
  account_id: string;
  email: string;
  full_name: string;
  phone_number: string;
  role: Role;
  events: Array<Event>;
};

export type EmailRequest = {
  email: string;
};

export type VerifyEmailRequest = {
  token: string;
};

export type ForgotEmailResponse = {
  message: string;
  email: string;
};

export type ResetPasswordRequest = {
  password: string;
};

export type ResetPasswordResponse = {
  message: string;
};

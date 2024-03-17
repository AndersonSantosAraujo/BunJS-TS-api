import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { createStripeCustomer } from "../lib/stripe";

export const listUsersController = async (
  request: Request,
  response: Response,
) => {
  // const users = await prisma.user.findMany({select: {id: true,},});
  const users = await prisma.user.findMany();

  response.send({
    users,
  });
};

export const findOneUserController = async (
  request: Request,
  response: Response,
) => {
  const { userId } = request.params;

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    return response.status(404).send({ error: "User not found" });
  }

  response.send({
    user,
  });
};

export const createUserController = async (
  request: Request,
  response: Response,
) => {
  const { name, email } = request.body;

  if (!name && !email) {
    return response.send({
      error: "A valid name and email is required",
    });
  }

  const userEmailAlready = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
    },
  });

  if (userEmailAlready) {
    return response.status(400).send({ error: "Already registered user" });
  }

  const stripeCustomer = await createStripeCustomer({ name, email });

  const user = await prisma.user.create({
    data: {
      name,
      email,
      stripeCustomerId: stripeCustomer.id,
    },
  });

  response.send({
    user,
  });
};

import { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function getPoll(app: FastifyInstance) {
  app.get("/polls/:pollId", async (request, reply) => {
    const getPollParams = z.object({
      pollId: z.string().uuid(),
    });
    const { pollId } = getPollParams.parse(request.params);

    // include > Inclui dados de relacionamento ao mesmo tempo que traz dados de uma entidade especifica
    const poll = await prisma.poll.findUnique({
      where: {
        id: pollId,
      },
      include: {
        options: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
    return reply.send({ poll });
  });
}

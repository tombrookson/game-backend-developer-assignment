import { z } from 'zod';

export const GameTypeEnum = z.enum(['BaseGame', 'Expansion']);

export const gameValidator = z.object({
    id: z.string().min(1, 'ID is required'),
    name: z.string().min(1, 'Name is required'),
    releaseYear: z.number().int().gte(1800).lte(new Date().getFullYear()),
    players: z.object({
        min: z.number().int().min(1),
        max: z.number().int().min(1),
    }).refine((data) => data.max >= data.min, {
        message: "Max players must be greater than or equal to min players",
    }),
    publisher: z.string().min(1),
    expansions: z.array(z.string()).optional(),
    type: GameTypeEnum,
});

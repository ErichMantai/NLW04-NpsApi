import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerControlller {
    async execute(request: Request, response: Response) {
        const { value } = request.params;
        const { u } = request.query;

        const surveyUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveyUsersRepository.findOne({
            id: String(u)
        });

        const surveyIsVoted = await surveyUsersRepository.findOne({
            where: { id: String(u), value: Not(IsNull()) }
        })

        if (surveyIsVoted) {
            throw new AppError("Surveys is voted!", 400)
        }


        if (!surveyUser) {
            throw new AppError("Surveys User does not exists!", 400)
        }

        surveyUser.value = Number(value);

        await surveyUsersRepository.save(surveyUser);

        return response.json(surveyUser);
    }
}
export { AnswerControlller }
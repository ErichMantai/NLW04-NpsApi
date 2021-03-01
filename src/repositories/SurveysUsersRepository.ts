import { EntityRepository, Repository } from "typeorm";
import { Survey_User } from "../models/SurveyUser";

@EntityRepository(Survey_User)
class SurveysUsersRepository extends Repository<Survey_User>{ }

export { SurveysUsersRepository }

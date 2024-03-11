import { mailer } from './../services/mailer';
import connectDB from "../connectDB";
import User from "../models/User";
import translations from '../../../translations/serverMail.json';
import { UserDB } from './types';

export const MailActions = {
    async notifyAssigmentNewTask(task: { name: string, id: string }, assignee: string, byUserName: string) {
        await connectDB();

        const targetUser = await User.findById(assignee).lean() as UserDB;
        const neededDictionary = this.getNeededDictionary(targetUser.locale, 'task_assigned');

        const text = neededDictionary.text.replace('taskName', task.name).replace('userName', byUserName);

        mailer(targetUser.email, neededDictionary.subject, text);
    },

    async notifyAboutComment(task: { name: string, id: string }, assignee: string, byUserName: string, comment: string) {
        await connectDB();

        const targetUser = await User.findById(assignee).lean() as UserDB;
        const neededDictionary = this.getNeededDictionary(targetUser.locale, 'new_comment');
        const text = neededDictionary.text.replace('taskName', task.name).replace('userName', byUserName).replace('comment', comment);

        mailer(targetUser.email, neededDictionary.subject, text);

    },

    getNeededDictionary(locale: string, branch: string) {
        //@ts-ignore
        const neededDictionary = translations.hasOwnProperty(locale) ? translations[locale] : translations.en as any;
        return neededDictionary[branch];

    }
};
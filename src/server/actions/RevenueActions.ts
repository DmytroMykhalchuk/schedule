import connectDB from '../connectDB';
import dayjs from 'dayjs';
import Revenue from '../models/Revenue';
import { AuthType, ProccessStatusType, RevenueChartType, RevenueDBdType, RevenueItemPopulatedDB, RevenueRecordPopulatedType, RevenueRecordType, RevenueStoreType, UpdateRevenueType } from './types';
import { ProjectActions } from './ProjectActions';
import { revenuePerPage } from '../constants';
import { UserActions } from './UserActions';
import { getRandomWeekdayDate } from '@/utlis/getRandomWeekdayDate';
import { getRandomBoolean, getRandomInt, getRandomString } from '../utils/utils';

export const RevenueActions = {
    async getLastRevenue(authParams: AuthType, page: number): Promise<{ total: number, revenues: RevenueRecordType[] }> {
        await connectDB();

        const project = await ProjectActions.getProjectByFilters(authParams, { _id: 1 });
        if (!project) {
            return { total: 0, revenues: [] };
        }
        const filter = { projectId: project._id };
        const total = await Revenue.countDocuments(filter);

        const revenues = await Revenue
            .find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * revenuePerPage)
            .limit(revenuePerPage)
            .lean() as RevenueDBdType[];

        const preparedRevenues: RevenueRecordType[] = revenues.map((item) => ({
            ...item,
            _id: item._id.toString(),
            author: item.author.toString(),
            projectId: item.projectId.toString(),
        }));

        return {
            revenues: preparedRevenues,
            total,
        };
    },

    async getRevenueById(authParams: AuthType, id: string): Promise<RevenueRecordPopulatedType | null> {
        await connectDB();
        const project = await ProjectActions.getProjectByFilters(authParams, { _id: 1 });

        if (!project) { return null; }

        const revenue = await Revenue.findOne({ projectId: project?._id, _id: id }).populate('author', 'name picture email').lean() as RevenueItemPopulatedDB;

        if (!revenue) { return null; }

        const preperedRevenue: RevenueRecordPopulatedType = {
            ...revenue,
            _id: revenue._id.toString(),
            projectId: revenue.projectId.toString(),
            author: {
                ...revenue.author,
                _id: revenue.author.toString(),
            },
        };

        return preperedRevenue;
    },

    async addRevenue(authParams: AuthType, storeRevenue: RevenueStoreType): Promise<ProccessStatusType & { revenueId?: string }> {
        await connectDB();

        const user = await UserActions.getUserByEmail(authParams.email);

        const project = await ProjectActions.getProjectById(authParams.projectId, { _id: 1 }, user._id);

        if (!project || !user) {
            return { success: false };
        }

        const revenueModel = new Revenue({
            projectId: project._id,
            author: user._id,
            targetDate: new Date(storeRevenue.date),
            cost: storeRevenue.cost,
            note: storeRevenue.note,
        });

        const revenue = await revenueModel.save();

        return { success: Boolean(revenue), revenueId: revenue._id.toString() };
    },

    async genreateRevenues(authorId: string, projectId: string, count = 100,) {
        await connectDB();
        const isPast = true;
        
        for (let index = 0; index < count; index++) {
            const randomDate = getRandomWeekdayDate(365, isPast);
            const revenueModel = new Revenue({
                projectId: projectId,
                author: authorId,
                targetDate: randomDate,
                cost: getRandomInt(-1000, 1000),
                note: getRandomBoolean(0.3) ? getRandomString() : '',
            });
            const revenue = await revenueModel.save();
        }
    },

    async updateRevenue(authParams: AuthType, updateRevenue: UpdateRevenueType): Promise<ProccessStatusType> {
        await connectDB();
        const user = await UserActions.getUserByEmail(authParams.email, { _id: 1 });
        const project = await ProjectActions.getProjectById(authParams.projectId, { _id: 1 }, user._id);

        if (!project || !user) {
            return { success: false };
        }

        const revenue = await Revenue.findOne({ _id: updateRevenue.id });

        revenue.note = updateRevenue.note;
        revenue.cost = updateRevenue.cost;
        revenue.targetDate = new Date(updateRevenue.date);
        revenue.author = user._id;

        revenue.save();

        return { success: true };
    },

    async deleteRevenue(authParams: AuthType, id: string): Promise<ProccessStatusType> {
        await connectDB();

        const project = await ProjectActions.getProjectByFilters(authParams);

        if (!project) { return { success: false }; }

        const revenue = await Revenue.findOneAndDelete({ _id: id });

        return { success: Boolean(revenue) };
    },

    async getYearRevenue(projectId: string): Promise<RevenueChartType> {
        await connectDB();

        const currentDate = dayjs();

        const lastDayCurrentMonth = currentDate.endOf('month');

        const firstDaYearBefore = currentDate.subtract(1, 'year').startOf('month');

        const revenuesLastYear = await Revenue.find({
            projectId,
            targetDate: {
                $gte: firstDaYearBefore.toDate(),
                $lte: lastDayCurrentMonth.toDate(),
            }
        }).lean() as RevenueDBdType[];

        const chart = {} as RevenueChartType;

        revenuesLastYear.forEach(item => {
            const month = dayjs(item.targetDate).month() + 1;
            if (chart.hasOwnProperty(month)) {
                chart[month] += item.cost;
            } else {
                chart[month] = item.cost;
            }
        });

        return chart;
    },

    async deleteGenerated(projectId: string) {
        await connectDB();

        await Revenue.deleteMany({ projectId: projectId });
    }
};
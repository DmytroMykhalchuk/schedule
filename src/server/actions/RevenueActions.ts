import dayjs from 'dayjs';
import connectDB from '../connectDB';
import { revenuePerPage } from '../constants';
import Revenue from '../models/Revenue';
import { ProjectActions } from './ProjectActions';
import { UserActions } from './UserActions';
import { AuthType, RevenueStoreType, ProccessStatusType, RevenueRecordType, RevenueDBdType, RevenueItemPopulatedDB, RevenueRecordPopulatedType, UpdateRevenueType, RevenueChartType } from './types';

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

    async addRevenue(authParams: AuthType, storeRevenue: RevenueStoreType): Promise<ProccessStatusType> {
        await connectDB();

        const user = await UserActions.getUserBySessionId(authParams.sessionId);
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

        return { success: Boolean(revenue) };
    },

    async updateRevenue(authParams: AuthType, updateRevenue: UpdateRevenueType): Promise<ProccessStatusType> {
        await connectDB();
        const user = await UserActions.getUserBySessionId(authParams.sessionId, { _id: 1 });
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
};
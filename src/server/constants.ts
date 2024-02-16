import { CategoryRecord } from "./actions/types";

export const priorities = [
    {
        statusName: 'low_priority',
        primaryColor: '#039F6D',
        secondaryColor: '#E3FFEB',
    },
    {
        statusName: 'medium_priority',
        primaryColor: '#DBB200',
        secondaryColor: '#FCFCE5',
    },
    {
        statusName: 'critical_prority',
        primaryColor: '#ff2626',
        secondaryColor: '#ffe9e9',
    }
];

export const priorityStyling = {
    'low_priority': {
        label: 'low_priority',
        primaryColor: '#039F6D',
        secondaryColor: '#E3FFEB',
    },
    'medium_priority': {
        label: 'medium_priority',
        primaryColor: '#DBB200',
        secondaryColor: '#FCFCE5',
    },
    'critical_prority': {
        label: 'critical_prority',
        primaryColor: '#ff2626',
        secondaryColor: '#ffe9e9',
    },
};

export type StyleRangeType = {
    primaryColor: string
    secondaryColor: string
    label: string
};

export const statuses = [
    {
        statusName: 'not_started',
        primaryColor: '#A94BF2',
        secondaryColor: '#F5EDFF',
    },
    {
        statusName: 'in_progress',
        primaryColor: '#039F6D',
        secondaryColor: '#E3FFEB',
    },
    {
        statusName: 'done',
        primaryColor: '#DBB200',
        secondaryColor: '#FCFCE5',
    }
];

export const statusStyling = {
    not_started: {
        label: 'not_started',
        primaryColor: '#A94BF2',
        secondaryColor: '#F5EDFF',
    },
    in_progress: {
        label: 'in_progress',
        primaryColor: '#039F6D',
        secondaryColor: '#E3FFEB',
    },
    done: {
        label: 'done',
        primaryColor: '#DBB200',
        secondaryColor: '#FCFCE5',
    },
};

export const taskDayPropertyStyle = {
    tomorrow: '#D71170',
    today: '#D71170',
    critical_prority: '#D71170',
    medium_priority: '#DBB200',
    low_priority: '#039F6D',
};

export const requiredDateLength = 10;

export const channelPrefixName = 'target_project';
export const newCommentEventName = 'new_comment';
export const removedCommentEventName = 'removed_comment';
export const authCookieKey = 'session_id';
export const projectIdCookieKey = 'project_id';

export const sessionLifeTimeInHours = 2;
export const workHours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

export const categoryColors = ['#FFD7A8', '#F6EFA7', '#ABF4BB', '#DBBFFE', '#A2E6FF', '#FFABAB', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF', '#BDB2FF', '#FFC6FF', '#FF9191', '#FFE08C', '#FAFF8B', '#B4FFA3', '#87CEEB', '#D8BFD8', '#B0E0E6', '#FF7F50'];
export const defaultCategory: CategoryRecord = {
    _id: 'undefined',
    color: categoryColors[0],
    name: 'No category',
    textColor: '#000000',
};
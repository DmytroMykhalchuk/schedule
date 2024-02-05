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
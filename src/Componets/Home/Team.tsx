import Grid from '@mui/material/Grid';
import Link from 'next/link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { TeamItem } from './Elements/TeamItem';
import { getTeam } from '@/app/[locale]/app/add/team/actions';
import { PaperTitle } from '../Common/PaperTitle';
import { useTranslations } from 'next-intl';

type TeamType = {
    limit?: number;
    authEmail: string;
    locale: string;
};

export const Team: React.FC<TeamType> = async ({ limit, authEmail, locale }) => {
    const team = await getTeam(authEmail);
    let isNeedRenderAddButton = true;
    if (limit && team.length >= limit) {
        team.length;
        // isNeedRenderAddButton = false;
    }

    return (
        <Paper elevation={4} sx={{ p: 2 }}>
            <PaperTitle pageName='AppHome' titleKey='team' />
            <Grid container spacing={2} alignItems={'stretch'}>
                {
                    team.map((person, index) => (
                        <Grid key={index} item xs={12} sm={6}>
                            <div>
                                <TeamItem
                                    avatar={person.user.picture}
                                    name={person.user.name}
                                    email={person.user.email}
                                    role={person.role}
                                />
                            </div>
                        </Grid>
                    ))
                }
                {isNeedRenderAddButton && <TeampAddButton locale={locale} />}
            </Grid>
        </Paper>
    );
};

type TeampAddButtonType = {
    locale: string;
};

export const TeampAddButton: React.FC<TeampAddButtonType> = ({ locale }) => {
    const translation = useTranslations('Form');
    return (
        <Grid item xs={12} sm={6}>
            <Link href={`/${locale}/app/add/team`}>
                <TeamItem
                    avatar={''}
                    name={translation('add_member')}
                    role={''}
                    email={''}
                    isAaddItem
                />
            </Link>
        </Grid>
    );
};
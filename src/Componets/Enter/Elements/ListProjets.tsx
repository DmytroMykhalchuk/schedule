'use client';

import { ProjectListAvailableRecord } from "@/server/types/projectTypes";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import styles from './../styles.module.scss';
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

type ListProjetsType = {
    projects: ProjectListAvailableRecord[];
    locale: string;
};

export const ListProjets: React.FC<ListProjetsType> = ({ projects }) => {
    const router = useRouter();

    const onChoose = (projectId: string) => {
        setCookie('project_id', projectId);
        router.push('/app');
    };

    return (
        <>
            {projects.map((project, index) => (
                <Stack key={project._id} spacing={2} component={'form'}>
                    <input type="hidden" name="project_id" value={project._id} />
                    <Typography
                        className={styles.buttonTitle}
                        variant="body1"
                        component={'button'}
                        sx={{ color: 'warning.main' }}
                        onClick={() => onChoose(project._id)}
                    >
                        {index + 1}. {project.name}
                    </Typography>
                </Stack>
            ))}
        </>
    );
};
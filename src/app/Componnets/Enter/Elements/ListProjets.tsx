'use client';

import { ProjectListAvailableRecord } from "@/server/types/projectTypes";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import styles from './../styles.module.scss';
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

type ListProjetsType = {
    projects: ProjectListAvailableRecord[]
};

export const ListProjets: React.FC<ListProjetsType> = ({ projects }) => {
    const router = useRouter();
    
    const onChoose = (projectId: string) => {
        setCookie('project_id', projectId);
        router.push('/app');
    };

    return (
        <>
            {projects.map(project => (
                <Stack key={project._id} spacing={2} component={'form'}>
                    <input type="hidden" name="project_id" value={project._id} />
                    <Typography
                        className={styles.buttonTitle}
                        variant="body1"
                        component={'button'}
                        onClick={() => onChoose(project._id)}
                    >
                        {project.name}
                    </Typography>
                </Stack>
            ))}
        </>
    );
};
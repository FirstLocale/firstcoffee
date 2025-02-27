"use client";

import { breakfastData } from "@/utils/menuData";
import Image from "next/image";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  //? following line used to disable unused var error on expand in 'const { expand, }'
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { expand, ...other } = props;
    return <IconButton {...other} />;
    })(({ theme }) => ({
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
        props: ({ expand }) => !expand,
        style: {
            transform: "rotate(0deg)",
        },
        },
        {
        props: ({ expand }) => !!expand,
        style: {
            transform: "rotate(180deg)",
        },
        },
    ],
}));

export default function BreakfastCard() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
    setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 500 }}>
            <CardHeader title="Breakfast." />
            <CardMedia
            component="img"
            height="194"
            image="/breakfasts.avif"
            alt="Breakfast"
        />
        <CardActions disableSpacing>
            <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
            >
                <ExpandMoreIcon />
            </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <div className="w-full md:w-[100%] bg-zinc-800 text-white rounded-2xl p-6 h-auto">
                        <h1 className="flex justify-center text-2xl mb-3">Breakfast.</h1>
                        {breakfastData.map((breakfast) => (
                            <div key={breakfast.id} className="mb-6">
                            <h2 className="flex justify-center text-2xl mb-3">{breakfast.item}</h2>
                            <p className="text-sm text-zinc-400 mt-1">{breakfast.desc}</p>
                            <Image
                                src={breakfast.image}
                                alt={breakfast.alt}
                                height={breakfast.height}
                                width={breakfast.width}
                                className="mt-2"
                            />
                                <div className="flex gap-6">
                                    <div className="mt-2 w-[20%]">
                                        {breakfast.menu && (
                                            <div className="mt-2">
                                                {breakfast.menu.map((menuItem) => (
                                                        <div key={menuItem.id} className="border-b border-zinc-700 py-2">
                                                        <div className="flex gap-2 text-base justify-center">
                                                            <p>
                                                                {Number(menuItem.reg).toFixed(2)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            )}
                                    </div>
                                    <div className="mt-2 w-[50%]">
                                            {breakfast.menu && (
                                                <div className="mt-2">
                                                    {breakfast.menu.map((menuItem) => (
                                                            <div key={menuItem.id} className="border-b border-zinc-700 py-2">
                                                            <div className="flex gap-2 text-base justify-center">
                                                            <p>{menuItem.item}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                )}
                                        </div>
                                </div>
                            </div>
                        ))}
                        </div>
            </CardContent>
        </Collapse>
        </Card>
    );
}
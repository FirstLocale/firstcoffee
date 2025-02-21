"use client";
import { drinkData } from "@/utils/menuData";
// import { breakfastData } from "@/utils/menuData";
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
// import containers from '../styles/containers.module.css'

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

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardHeader title="Drink." />
      <CardMedia
        component="img"
        height="194"
        image="/variousDrinks.jpg"
        alt="Cup of coffee"
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
            {drinkData.map((drink) => (
              <div key={drink.id} className="mb-6">
                <h2 className="flex justify-center text-2xl mb-3">
                  {drink.item}
                </h2>
                <CardMedia
                  component="img"
                  image={drink.image}
                  alt={drink.alt}
                  height={drink.height}
                  width={drink.width}
                />
                <div className="flex gap-6">
                  <div className="mt-2 w-[20%]">
                    <h3 className="flex justify-center mb-3 text-lg">REG</h3>
                    {drink.menu.map((menuItem) => (
                      <div
                        key={menuItem.id}
                        className="border-b border-zinc-700 py-2"
                      >
                        <div className="flex gap-2 text-base justify-center">
                          <p>
                            {typeof menuItem.reg === "number"
                              ? ` ${menuItem.reg.toFixed(2)}`
                              : ` ${menuItem.reg}`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-2 w-[20%]">
                    <h3 className="flex justify-center mb-3 text-lg">LRG</h3>
                    {drink.menu.map((menuItem) => (
                      <div
                        key={menuItem.id}
                        className="border-b border-zinc-700 py-2"
                      >
                        <div className="flex gap-2 text-base justify-center">
                          {menuItem.lrg !== undefined && (
                            <p
                              style={{
                                color:
                                  menuItem.lrg === "0"
                                    ? "transparent"
                                    : "inherit",
                              }}
                            >
                              {Number(menuItem.lrg).toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-2 w-[50%]">
                    <h3 className="flex justify-center mb-3 text-lg">DRINK</h3>
                    {drink.menu.map((menuItem) => (
                      <div
                        key={menuItem.id}
                        className="border-b border-zinc-700 py-2"
                      >
                        <div className="flex gap-2 text-base justify-center">
                          <p>{menuItem.item}</p>
                        </div>
                      </div>
                    ))}
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

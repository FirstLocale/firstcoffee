"use client";
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
import Image from "next/image";
import { Drink, Breakfast } from "../utils/types";

type MenuProps = {
  title: string;
  headerImage: string;
  headerAlt: string;
  data: Drink[] | Breakfast[];
  showLarge?: boolean;
};

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  void expand;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  transform: expand ? "rotate(180deg)" : "rotate(0deg)",
}));

export default function Menu({
  title,
  headerImage,
  headerAlt,
  data,
  showLarge = false,
}: MenuProps) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardHeader title={title} />
      <CardMedia
        component="img"
        height="194"
        image={headerImage}
        alt={headerAlt}
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
            {data.map((category) => (
              <div key={category.id} className="mb-6">
                <h1 className="flex justify-center text-2xl mb-3">
                  {category.item}
                </h1>
                {"desc" in category && category.desc && (
                  <p className="text-sm text-zinc-400 mt-1">{category.desc}</p>
                )}
                {headerImage.endsWith("avif") ? (
                  <Image
                    src={category.image}
                    alt={category.alt}
                    height={category.height}
                    width={category.width}
                    className="mt-2"
                  />
                ) : (
                  <CardMedia
                    component="img"
                    image={category.image}
                    alt={category.alt}
                    height={category.height}
                    width={category.width}
                  />
                )}
                <div className="flex gap-6">
                  {category.menu?.some(
                    (menuItem) =>
                      menuItem.reg !== undefined && menuItem.reg !== null
                  ) && (
                    <div className="mt-2 w-[20%]">
                      <h3 className="flex justify-center mb-3 text-lg">REG</h3>
                      {category.menu?.map(
                        (menuItem) =>
                          menuItem.reg !== undefined &&
                          menuItem.reg !== null && (
                            <div
                              key={menuItem.id}
                              className="border-b border-zinc-700 py-2"
                            >
                              <div className="flex gap-2 text-base justify-center">
                                <p>
                                  {typeof menuItem.reg === "number"
                                    ? `${
                                        menuItem.reg < 0.99 ? "+ " : ""
                                      }${menuItem.reg.toFixed(2)}`
                                    : `${menuItem.reg}`}
                                </p>
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  )}
                  {showLarge &&
                    category.menu?.some(
                      (menuItem) =>
                        menuItem.lrg !== undefined &&
                        menuItem.lrg !== null &&
                        menuItem.lrg !== "0"
                    ) && (
                      <div className="mt-2 w-[20%]">
                        <h3 className="flex justify-center mb-3 text-lg">
                          LRG
                        </h3>
                        {category.menu?.map(
                          (menuItem) =>
                            menuItem.lrg !== undefined &&
                            menuItem.lrg !== null &&
                            menuItem.lrg !== "0" && (
                              <div
                                key={menuItem.id}
                                className="border-b border-zinc-700 py-2"
                              >
                                <div className="flex gap-2 text-base justify-center">
                                  <p>
                                    {menuItem.lrg === 0 || menuItem.lrg === "0"
                                      ? "-" // Render a blank space instead of skipping
                                      : typeof menuItem.lrg === "number"
                                      ? menuItem.lrg.toFixed(2)
                                      : Number(menuItem.lrg).toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            )
                        )}
                      </div>
                    )}
                  {category.menu?.some((menuItem) => menuItem.item) && (
                    <div
                      className={`mt-2 ${showLarge ? "w-[50%]" : "w-[70%]"}`}
                    >
                      <h3 className="flex justify-center mb-3 text-lg">
                        {title.startsWith("Drink") ? "DRINK" : "ITEM"}
                      </h3>
                      {category.menu?.map(
                        (menuItem) =>
                          menuItem.item && (
                            <div
                              key={menuItem.id}
                              className="border-b border-zinc-700 py-2"
                            >
                              <div className="flex gap-2 text-base justify-center">
                                <p>{menuItem.item}</p>
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
}

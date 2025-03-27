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
import { Drink, Food } from "../utils/types";

type MenuProps = {
  title: string;
  headerImage: string;
  headerAlt: string;
  data: Drink[] | Food[];
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
          <ExpandMoreIcon sx={{ color: "#f97316" }} />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <div className="w-full md:w-[100%] bg-#241f21 border-2 border-orange-500 text-white font-cutive rounded-2xl px-6 pt-6 h-auto">
            {data.map((category) => (
              <div key={category.id} className="mb-6">
                <h1 className="flex justify-center text-xl mb-3">
                  {category.item}
                </h1>
                {"desc" in category && category.desc && (
                  <p className="text-sm text-zinc-400 pb-4 sm:leading-normal leading-relaxed sm:tracking-normal tracking-wide">
                    {category.desc}
                  </p>
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
                {/* Using TailWind Table for Drink,Reg, Lrg */}
                <div className="table w-full mt-4">
                  {/* Table Header */}
                  <div className="table-header-group">
                    <div className="table-row">
                      <div className="table-cell text-center font-bold pb-2">
                        {title.startsWith("Drink") ? "DRINK" : "ITEM"}
                      </div>
                      <div className="table-cell text-center font-bold pb-2">
                        REG
                      </div>
                      {showLarge && (
                        <div className="table-cell text-center font-bold pb-2">
                          LRG
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Table Body */}
                  <div className="table-row-group">
                    {category.menu?.map((menuItem) => (
                      <div key={menuItem.id} className="table-row">
                        {/* DRINK / ITEM column */}
                        <div className="table-cell border-b border-zinc-700 py-2 align-top">
                          <p className="text-sm">{menuItem.item}</p>
                          {showLarge && menuItem.opts && (
                            <p className="text-xs text-zinc-400 mt-1">
                              {menuItem.opts}
                            </p>
                          )}
                        </div>

                        {/* REG column */}
                        <div className="table-cell border-b border-zinc-700 py-2 px-6 align-top text-center">
                          {menuItem.reg !== undefined && menuItem.reg !== null ? (
                            <p className="text-sm">
                              {typeof menuItem.reg === "number"
                                ? `${menuItem.reg < 0.99 ? "+ " : ""}${menuItem.reg.toFixed(2)}`
                                : menuItem.reg}
                            </p>
                          ) : (
                            // If there's no reg value, render an empty cell
                            <p className="text-sm">-</p>
                          )}
                        </div>

                        {/* LRG column (conditional) */}
                        {showLarge && (
                          <div className="table-cell border-b border-zinc-700 py-2 align-top text-center">
                            {menuItem.lrg !== undefined &&
                            menuItem.lrg !== null &&
                            menuItem.lrg !== "0" ? (
                              <p className="text-sm">
                                    {menuItem.lrg === 0 || menuItem.lrg === "0"
                                      ? "-"
                                      : typeof menuItem.lrg === "number"
                                      ? menuItem.lrg.toFixed(2)
                                      : Number(menuItem.lrg).toFixed(2)}
                                  </p>
                            ) : (
                              <p className="text-sm">-</p>
                            )}
                          </div>
                        )}
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

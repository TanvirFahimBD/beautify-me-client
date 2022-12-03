import React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import Banner1 from "../../../utilities/images/banner/banner (1).jpg"
import Banner2 from "../../../utilities/images/banner/banner (2).jpg"
import Banner3 from "../../../utilities/images/banner/banner (3).jpg"
import Banner4 from "../../../utilities/images/banner/banner (4).jpg"

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
    {
        label: "Haircut 1",
        imgPath: Banner1,
    },
    {
        label: "Haircut 2",
        imgPath: Banner2,
    },
    {
        label: "Haircut 3",
        imgPath: Banner3,
    },
    {
        label: "Haircut 4",
        imgPath: Banner4,
    },
];

const Banner = () => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <Box sx={{ minWidth: 800, flexGrow: 1 }}>
            <AutoPlaySwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {images.map((step, index) => (
                    <div key={step.label}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Box
                                component="img"
                                sx={{
                                    height: 900,
                                    display: "block",
                                    minWidth: 900,
                                    overflow: "hidden",
                                    width: "100%",
                                }}
                                src={step.imgPath}
                                alt={step.label}
                            />
                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>
        </Box>
    );
};

export default Banner;

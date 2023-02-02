import React from "react";
import { Grid, Box, Container, Typography } from "@mui/material";
const ImportantPlan = () => {
  return (
    <Box py={2}>
      <Container>
        <Box
          sx={{
            bgcolor: "#04242A",
            padding: "1rem",
            border: "1px solid #2AFC95",
          }}
        >
          <Typography variant="h2">
            1. Important: Plans return are float and daily profit for a new
            deposit will increase by 0.5% daily
          </Typography>
          <Typography variant="h2">
            2. Minimum deposit amount is 0.05 BNB and you can have multiple
            deposits
          </Typography>
          <Typography>
            3. Earnings every moment, withdraw instantly any time (if you did
            not use capitalization of interest in Plan 4, Plan 5 and Plan 6)
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ImportantPlan;

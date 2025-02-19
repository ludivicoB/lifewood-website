import { Card, CardContent, Typography, Grid, Divider } from "@mui/material";

export default function FullInfoCard({ selectedFile }) {
  return (
    <Card
      sx={{
        maxWidth: "100%",
        // textAlign: "center",
        mx: "auto",
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Full Info
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={1}>
          {[
            ["First Name", selectedFile?.firstname],
            ["Last Name", selectedFile?.lastname],
            ["Email", selectedFile?.email],
            ["Age", selectedFile?.age],
            ["Degree", selectedFile?.degree],
            ["Job Experience", selectedFile?.job_experience],
            ["Contact Time", selectedFile?.contact_time],
            ["Phone", selectedFile?.num],
            ["Project Name", selectedFile?.projectname],
          ].map(([label, value], index) => (
            <Grid item xs={12} key={index}>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ fontWeight: "bold" }}
              >
                {label}:
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {value || "N/A"}
              </Typography>
              {index !== 8 && <Divider light />}
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

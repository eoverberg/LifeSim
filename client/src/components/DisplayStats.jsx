import React from "react";
import Paper from '@mui/material/Paper';
import {Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function DisplayStatistics({statistics, setStatistics, displayData })
{
    if (displayData!=="" && statistics!=="default"){
      let scores = JSON.parse(statistics)
      let list = scores.top.top_scores;
      let info = scores.stats.end_stats;
      
      
        let data = displayData.split(",")
        const rows = [
        {
            lf: 'Plants', 
            sc: info.plant_gen[0], 
            ec: parseInt(data[2]), 
            gen: info.plant_gen.length
        },
        {
            lf: 'Grazers', 
            sc: info.grazer_gen[0], 
            ec: parseInt(data[3]), 
            gen: info.grazer_gen.length
        },
        {
            lf: 'Predators', 
            sc: info.predator_gen[0], 
            ec: parseInt(data[4]), 
            gen: info.predator_gen.length
        },

      ];

      const rows2 = [
        {
            rank: 1, 
            name: list[0].name, 
            score: list[0].score
        },
        {
            rank: 2, 
            name: list[1].name, 
            score: list[1].score
        },
        {
            rank: 3, 
            name: list[2].name, 
            score: list[2].score
        },
        {
            rank: 4, 
            name: list[3].name, 
            score: list[3].score
        },
        {
            rank: 5, 
            name: list[4].name, 
            score: list[4].score
        },
      ];
    return(
        <Grid container rowSpacing = {5} columnSpacing={0}>
            <Grid item xs={12}>
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">Statistics </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" >Lifeform</TableCell>
                                <TableCell align="center" >Start Count</TableCell>
                                <TableCell align="center" >End Count</TableCell>
                                <TableCell align="center" >Generations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            rows.map((row) => (
                            <TableRow
                                key={row.lf}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align= "center">{row.lf}</TableCell>
                                <TableCell align="center">{row.sc}</TableCell>
                                <TableCell align="center">{row.ec}</TableCell>
                                <TableCell align="center">{row.gen}</TableCell>
                            </TableRow>
                            ))
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={12}>
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">Top Scores</Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" >Rank</TableCell>
                                <TableCell align="center" >Name</TableCell>
                                <TableCell align="center" >Score</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            rows2.map((row) => (
                            <TableRow
                                key={row.rank}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align= "center">{row.rank}</TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.score}</TableCell>
                            </TableRow>
                            ))
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )}
    else{
        return(
            <></>
        );
    }
}
export default DisplayStatistics 
/* <>
        <p ref={foo}></p>
        <p ref={first}></p>
        <p ref={second}></p>
        <p ref={third}></p>
        <p ref={fourth}></p>
        <p ref={fifth}></p>
        <br></br>
        <p>Latest Run Statistics</p>
        <p ref={time_stat}></p>
        <p ref={plant_stat}></p>
        <p ref={grazer_stat}></p>
        <p ref={pred_stat}></p>
        <p ref={last_score}></p>
        </> */
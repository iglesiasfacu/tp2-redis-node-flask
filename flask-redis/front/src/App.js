import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";

function App() {
  const [chapters, setChapters] = useState();
  const [availability, setAvailability] = useState();
  const [selectedChapter, setSelectedChapter] = useState();
  const [selectedKeyChapter, setSelectedKeyChapter] = useState();
  const [openRentDialog, setOpenRentDialog] = useState();
  const [openConfirmDialog, setOpenConfirmDialog] = useState();

  console.log(availability);

  const handleOpenRentDialog = () => {
    setOpenRentDialog(true);
  };

  const handleCloseRentDialog = () => {
    setOpenRentDialog(false);
  };

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const getData = async () => {
    const dataChapters = await axios.get("http://localhost:5000/listChapters");
    setChapters(dataChapters.data);

    const dataStatus = await axios.get("http://localhost:5000/listStatus");
    setAvailability(dataStatus.data);
  };

  const rentChapter = async (keyChapter) => {
    if (keyChapter) {
      await axios.post("http://localhost:5000/rentChapter", null, {
        params: {
          keyChapter,
        },
      });
      getData();
    }
  };

  const confirmRent = async (keyChapter) => {
    if (keyChapter) {
      await axios.post("http://localhost:5000/confirmRent", null, {
        params: {
          keyChapter,
        },
      });
      getData();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 1 }}
        padding="10px"
      >
        {chapters && availability ? (
          <>
            {Object.entries(chapters).map(([key, value]) => (
              <Grid item xs={16} sm={6} md={4} lg={3}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 20, mb: 3 }}>
                      {value}
                    </Typography>
                    <Chip
                      label={availability[key]}
                      color={
                        availability[key] === "available"
                          ? "success"
                          : availability[key] === "reserved"
                          ? "warning"
                          : "default"
                      }
                    />
                  </CardContent>
                  <CardActions>
                    {availability[key] === "available" ? (
                      <div style={{ marginLeft: "auto" }}>
                        <Button
                          onClick={() => {
                            setSelectedKeyChapter(key);
                            setSelectedChapter(value);
                            handleOpenRentDialog();
                          }}
                          size="small"
                        >
                          Alquilar
                        </Button>
                      </div>
                    ) : availability[key] === "reserved" ? (
                      <>
                        <div style={{ marginLeft: "auto" }}>
                          <Button
                            onClick={() => {
                              setSelectedKeyChapter(key);
                              setSelectedChapter(value);
                              handleOpenConfirmDialog();
                            }}
                            size="small"
                          >
                            Confirmar pago
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div style={{ marginLeft: "auto" }}>
                        <Button disabled size="small">
                          Alquilar
                        </Button>
                      </div>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </>
        ) : null}
      </Grid>

      {chapters ? (
        <>
          <Dialog
            open={openRentDialog}
            onClose={handleCloseRentDialog}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>Desea alquilar {selectedChapter}?</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                El capitulo quedará reservado por 4 minutos hasta que se
                confirme el pago, de no ser asi se cancelará el alquiler.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseRentDialog}>Volver</Button>

              <Button
                onClick={() => {
                  rentChapter(selectedKeyChapter);
                  handleCloseRentDialog();
                }}
                variant="contained"
              >
                Alquilar
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openConfirmDialog}
            onClose={handleCloseConfirmDialog}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>Confirmar pago de {selectedChapter}?</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Una vez confirmado el pago el capitulo quedará disponible por
                por 24 hs.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseConfirmDialog}>Volver</Button>
              <Button
                onClick={() => {
                  confirmRent(selectedKeyChapter);
                  handleCloseConfirmDialog();
                }}
                variant="contained"
              >
                Confirmar pago
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : null}
    </div>
  );
}

export default App;

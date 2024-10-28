import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../lib/store";
import { medicalRecord } from "../../../constants/types";
import {
  deleteMedicalRecord,
  getMedicalRecords,
} from "../../../lib/slices/medicalRecordSlice";
import Loading from "../../Loading";
import DeleteDialog from "../../../components/DeleteDialog";
import FloatingButton from "../../../components/FloatingButton";
import Title from "../../../components/Title";

export default function MedicalRecords() {
  const { ref, inView, entry } = useInView();
  const idDel = useRef<number>(0);
  const { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const { loading, loadingDelete } = useSelector(
    (state: RootState) => state.medicalRecord
  );
  const [totalMedicalRecords, setTotalMedicalRecords] = useState<
    medicalRecord[]
  >([]);
  const [totalRows, setTotalRows] = useState<number>(10);
  const [paginationModel, setPaginationModel] = useState<{
    page: number;
    pageSize: number;
  }>({ page: 0, pageSize: 10 });

  useEffect(() => {
    if (entry)
      (
        entry.target as HTMLElement
      ).style.animation = `animationBasic .7s .3s forwards`;
  }, [inView, entry]);

  useEffect(() => {
    dispatch(getMedicalRecords(1))
      .unwrap()
      .then((result) => {
        setTotalRows(result.pagination.total);
        setTotalMedicalRecords(result.data);
      })
      .catch((error) => {
        console.log("🚀 ~ dispatch ~ error:", error.message);
        // setTotalMedicalRecords(medicalRecords)
      });
  }, [dispatch]);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = (params: any) => {
    setOpenDeleteModal(true);
    idDel.current = params.id;
  };
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  const handleDelete = () => {
    dispatch(deleteMedicalRecord(idDel.current.toString()))
      .unwrap()
      .then(() => {
        setTotalMedicalRecords((prev) =>
          prev.filter((el) => {
            return el.id !== idDel.current;
          })
        );
        handleCloseDeleteModal();
      })
      .catch((error) => {
        console.log("🚀 ~ dispatch ~ error:", error.message);
        handleCloseDeleteModal();
      });
  };
  const columns: GridColDef[] = [
    {
      field: "patient_id",
      headerName: "Patient Name",
      width: 150,
      renderCell: (params) => {
        return <span>{params.row.patient.name}</span>;
      },
    },
    {
      field: "blood_type",
      headerName: "Blood",
      width: 60,
    },
    {
      field: "admission_date",
      headerName: "Admission Date",
      width: 120,
      renderCell: (params) => {
        return <span>{params.row.admission_date}</span>;
      },
    },
    {
      field: "discharge_date",
      headerName: "Discharge Date",
      width: 120,
      renderCell: (params) => {
        return <span>{params.row.discharge_date}</span>;
      },
    },
    {
      field: "medicines",
      headerName: "Medicines",
      width: 300,
      renderCell: (params) => {
        return <span>{params.row.medicines.join(", ")}</span>;
      },
    },
    {
      field: "details",
      headerName: "Details",
      width: 400,
    },
    {
      field: "doctor_id",
      headerName: "Doctor",
      width: 75,
      renderCell: (params) => {
        return <span>{params.row.doctor.name}</span>;
      },
    },
    {
      field: "room_id",
      headerName: "Room",
      width: 75,
      renderCell: (params) => {
        return <span>{params.row.room.room_number}</span>;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="flex items-center gap-5 mt-3">
            <Link to={`edit/${params.id}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="var(--primary)"
                  fillRule="evenodd"
                  d="M14 4.182A4.14 4.14 0 0 1 16.9 3c1.087 0 2.13.425 2.899 1.182A4 4 0 0 1 21 7.037c0 1.068-.43 2.092-1.194 2.849L18.5 11.214l-5.8-5.71l1.287-1.31l.012-.012Zm-2.717 2.763L6.186 12.13l2.175 2.141l5.063-5.218zm-6.25 6.886l-1.98 5.849a.99.99 0 0 0 .245 1.026a1.03 1.03 0 0 0 1.043.242L10.282 19l-5.25-5.168Zm6.954 4.01l5.096-5.186l-2.218-2.183l-5.063 5.218l2.185 2.15Z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
            <span
              className="cursor-pointer"
              onClick={(e) => {
                handleOpenDeleteModal(params);
                e.stopPropagation();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 16 16"
              >
                <path
                  fill="#d32f2f"
                  d="M11 3h5v1H0V3h5V1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1zm-7.056 8H7v1H4.1l.392 2.519c.042.269.254.458.493.458h6.03c.239 0 .451-.189.493-.458l1.498-9.576H14l-1.504 9.73c-.116.747-.74 1.304-1.481 1.304h-6.03c-.741 0-1.365-.557-1.481-1.304l-1.511-9.73H9V5.95H3.157L3.476 8H8v1H3.632zM6 3h4V1H6z"
                ></path>
              </svg>
            </span>
          </div>
        );
      },
    },
  ];

  const handleChangePage = (e: { page: number }) => {
    setPaginationModel((prev) => ({ ...prev, page: e.page }));
    dispatch(getMedicalRecords(e.page + 1))
      .unwrap()
      .then((result) => {
        setTotalRows(result.pagination.total);
        setTotalMedicalRecords(result.data);
      })
      .catch((error) => {
        console.log("🚀 ~ dispatch ~ error:", error.message);
      });
  };

  return (
    <>
      {loading === "pending" ? (
        <Loading />
      ) : (
        <>
          <div className="px-5">
            <Title title="Medical Record" />

            <div className="flex justify-center">
              {totalMedicalRecords.length === 0 ? (
                <div
                  className="flex justify-center items-center"
                  style={{ minHeight: "50vh" }}
                >
                  <div>No Medical Record here yet</div>
                </div>
              ) : (
                <Paper
                  sx={{
                    width: "fit-content",
                    overflowX: "scroll",
                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                  }}
                >
                  <div
                    className="px-5 py-2"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      opacity: "0",
                    }}
                    ref={ref}
                  >
                    <DataGrid
                      rows={totalMedicalRecords}
                      columns={columns}
                      initialState={{ pagination: { paginationModel } }}
                      pageSizeOptions={[10]}
                      rowCount={totalRows}
                      paginationMode="server"
                      paginationModel={paginationModel}
                      onPaginationModelChange={handleChangePage}
                      // checkboxSelection
                      sx={{ border: 0 }}
                    />
                  </div>
                </Paper>
              )}
            </div>
          </div>

          <DeleteDialog
            open={openDeleteModal}
            handleClose={handleCloseDeleteModal}
            handleDelete={handleDelete}
            loading={loadingDelete}
          />

          <FloatingButton
            url={`/patients/${id}/add`}
            tooltip="Add Medical Record"
          />
        </>
      )}
    </>
  );
}

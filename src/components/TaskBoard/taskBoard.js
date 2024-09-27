import React, { useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
import { Search } from "./seacrhFilterBar";
import { AddForm } from "./addTaskDialog";
import {
  deleteTask,
  getAllTask,
  updateTaskStatus,
} from "../services/crudServices";
import { toast } from "react-toastify";

const TaskBoard = () => {
  // eslint-disable-next-line
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    descriptions: "",
  });
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await getAllTask();
      const data = res.data.data;

      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
      toast.success("Task deleted successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Some error occurred");
    }
  };

  const handleToggleStatus = async (task) => {
    const newStatus = task.status === "completed" ? "pending" : "completed";

    try {
      await updateTaskStatus(task._id, newStatus);
      fetchTasks();
      toast.success(`Task marked as ${newStatus}.`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Some error occurred");
    }
  };

  const handleEditTask = (task) => {
    setFormData(task);
    setEditMode(true);
    setOpen(true);
  };
  const filteredTask = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  return (
    <>
      {isLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <div style={{ height: "100vh", width: "100%" }}>
        <Box sx={{ padding: 2 }}>
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{ mb: 2 }}
          >
            Add Task
          </Button>
          <AddForm
            open={open}
            setOpen={setOpen}
            formData={formData}
            setFormData={setFormData}
            isEditMode={isEditMode}
            setEditMode={setEditMode}
            fetchTasks={fetchTasks}
            setView={setView}
            view={view}
          />
          <Search setSearchQuery={setSearchQuery} setFilter={setFilter} />

          <Grid container spacing={2} sx={{ mb: 4, mt: 3 }}>
            {filteredTask.length > 0 ? (
              filteredTask.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item._id}>
                  <Card sx={{ backgroundColor: "#aef2ef" }}>
                    <CardContent>
                      <Typography variant="h6">
                        {item.title.toUpperCase()}
                      </Typography>
                      <Typography>{item.descriptions}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => handleToggleStatus(item)}
                        variant="contained"
                        sx={{
                          background:
                            item?.status === "completed" ? "green" : "blue",
                        }}
                      >
                        {item?.status === "completed"
                          ? "Completed"
                          : "Mark Complete"}
                      </Button>
                      <Button size="small" onClick={() => handleEditTask(item)}>
                        Edit
                      </Button>
                      <Button
                        size="small"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography>No Task Found!.</Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default TaskBoard;

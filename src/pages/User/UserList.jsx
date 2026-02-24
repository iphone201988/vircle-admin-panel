// import { useEffect, useState } from "react";

// import { TextField, Box, Typography, Divider } from "@mui/material";
// import DataTable from "../../components/DataTable";
// import GroupIcon from "@mui/icons-material/Group"; // optional icon
// import { getUserList, deleteUser ,activateOrDeactivate } from "../../utils";
// import Tooltip from "@mui/material/Tooltip";
// import Chip from "@mui/material/Chip";
// import Stack from "@mui/material/Stack";
// import IconButton from "@mui/material/IconButton";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import Loader from "../../components/Loader";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import CancelIcon from "@mui/icons-material/Cancel";
// import toast from "react-hot-toast";
// import Avatar from "@mui/material/Avatar";

// export default function UserList() {
//   const [loading, setLoading] = useState(false);
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await getUserList();
//         console.log('response.data.users',response.data.users)
//         setUsers(response.data.users);
//       } catch (error) {
//         console.error("Failed to fetch users:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//    const s3Url = import.meta.env.VITE_S3_URL;
//   const rows = users.map((user) => ({
//     id: user._id,
//     name: user.name || "--",
//     email: user.email || "--",
//     age: user.age || "--",
//     gender:  typeof user.gender === "string"
//     ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1).toLowerCase()
//     : "--",
//     aiAccountCount: user.aiAccountCount,
//     personal_details: user.personal_details || "--",
//     isActive: user.isActive,
//     avatar:s3Url ? s3Url+ user.avatar : import.meta.env.VITE_SERVERIMG_URL+'/'+ user.avatar,
//   }));

//   const handleDeleteClick = async (params) => {
//     setLoading(true);
//     const response = await deleteUser(params.id);
//     const users = await getUserList();
//     setUsers(users?.data?.users);
//     console.log(response);
//     setLoading(false);
//   };

//   const handleToggleStatus =async (params) => {
//     console.log('=======================params',params);
//        setLoading(true)
//      const response =await activateOrDeactivate(params.id);
//      const users =await getUserList();
//      setUsers(users?.data?.users);
//      toast.success(response.message);
//      setLoading(false);

//   };

//  const columns = [
//   {
//     field: "avatar",
//     headerName: "Avatar",
//     flex: 0.4,
//     minWidth: 60,
//     sortable: false,
//     renderCell: (params) => (
//       <Avatar
//         alt={params.row.name}
//         src={params.value || "/default-avatar.png"} // fallback avatar
//         sx={{ width: 32, height: 32 }}
//       />
//     ),
//   },
//   { field: "name", headerName: "First name", flex: 1, minWidth: 120 },
//   { field: "email", headerName: "Email", flex: 1, minWidth: 120 },
//   {
//     field: "age",
//     headerName: "Age",
//     type: "number",
//     flex: 0.6,
//     minWidth: 80,
//     align: "left",
//     headerAlign: "left",
//   },
//   {
//     field: "gender",
//     headerName: "Gender",
//     flex: 1,
//     minWidth: 160,
//   },
//   {
//     field: "aiAccountCount",
//     headerName: "AI Account Count",
//     type: "number",
//     flex: 0.6,
//     minWidth: 80,
//     align: "left",
//     headerAlign: "left",
//   },
//   {
//     field: "personal_details",
//     headerName: "Personal Details",
//     flex: 1,
//     minWidth: 160,
//     sortable: false,
//     renderCell: (params) => (
//       <Tooltip title={params.value || "--"}>
//         <Typography
//           variant="body2"
//           noWrap
//           sx={{
//             maxWidth: "100%",
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//             whiteSpace: "nowrap",
//           }}
//         >
//           {params.value || "--"}
//         </Typography>
//       </Tooltip>
//     ),
//   },
//   {
//     field: "isActive",
//     headerName: "Status",
//     flex: 0.8,
//     minWidth: 100,
//     renderCell: (params) => (
//       <Chip
//         label={params.value ? "Active" : "Inactive"}
//         color={params.value ? "success" : "default"}
//         size="small"
//         variant="outlined"
//       />
//     ),
//   },
//   {
//     field: "_id",
//     headerName: "Actions",
//     sortable: false,
//     flex: 0.8,
//     minWidth: 100,
//     renderCell: (params) => (
//       <Stack direction="row" spacing={1}>
//         <Tooltip
//           title={params.row.isActive ? "Deactivate User" : "Activate User"}
//         >
//           <IconButton
//             onClick={() => handleToggleStatus(params.row)}
//             size="small"
//             color={params.row.isActive ? "success" : "default"}
//           >
//             {params.row.isActive ? (
//               <CheckCircleIcon fontSize="small" />
//             ) : (
//               <CancelIcon fontSize="small" />
//             )}
//           </IconButton>
//         </Tooltip>

//         <Tooltip title="Delete User">
//           <IconButton
//             onClick={() => handleDeleteClick(params.row)}
//             size="small"
//             color="error"
//           >
//             <DeleteIcon fontSize="small" />
//           </IconButton>
//         </Tooltip>
//       </Stack>
//     ),
//   },
// ];

//   return (
//     <>
//       {loading ? (
//        <Loader />
//       ) : (
//         <Box p={4}>
//           <Box display="flex" alignItems="center" mb={2}>
//             <GroupIcon color="primary" sx={{ mr: 1 }} />
//             <Typography
//               variant="h5"
//               fontWeight="bold"
//               color="primary"
//               sx={{ borderBottom: "2px solid #1976d2", pb: 1 }}
//             >
//               Users List
//             </Typography>
//           </Box>

//           <DataTable users={users} columns={columns} rows = {rows}/>
//         </Box>
//       )}
//     </>
//   );
// }

import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import DataTable from "../../components/DataTable";
import GroupIcon from "@mui/icons-material/Group";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../../components/Loader";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import toast from "react-hot-toast";
import Avatar from "@mui/material/Avatar";

import {
  useGetUserListQuery,
  useDeleteUserMutation,
  useActivateOrDeactivateMutation,
} from "../../rtk/api/adminApi";

export default function UserList() {
  const { data, error, isLoading } = useGetUserListQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [toggleUserStatus] = useActivateOrDeactivateMutation();

  const [rows, setRows] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const users = data?.data?.users || [];
    const s3Url = import.meta.env.VITE_S3_URL;
    const serverUrl = import.meta.env.VITE_SERVERIMG_URL;

    const mappedRows = users.map((user) => {
      const devices = user.devices || [];

      const iosCount = devices.filter(
        (d) => Number(d.deviceType) === 1
      ).length;

      const androidCount = devices.filter(
        (d) => Number(d.deviceType) === 2
      ).length;

      // ✅ TOKEN USED LOGIC
      const tokensUsed =
        user.subscription?.usage?.tokensUsed ??
        user.monthlyTokenUsage ??
        0;

      // ✅ START DATE SAFE PARSE
      const subscriptionStartDate =
        user.subscription &&
        typeof user.subscription === "object" &&
        user.subscription.startDate
          ? new Date(user.subscription.startDate).toLocaleDateString()
          : "--";

      // ✅ AVATAR SAFE
      let avatar = "/default-avatar.png";

      if (user.avatar) {
        if (user.avatar.startsWith("http")) {
          avatar = user.avatar;
        } else if (s3Url) {
          avatar = s3Url + user.avatar;
        } else if (serverUrl) {
          avatar = `${serverUrl}/${user.avatar}`;
        }
      }

      return {
        id: user._id,
        name: user.name || "--",
        email: user.email || "--",
        age: user.age ?? "--",

        gender:
          typeof user.gender === "string"
            ? user.gender.charAt(0).toUpperCase() +
              user.gender.slice(1).toLowerCase()
            : "--",

        aiAccountCount: user.aiAccountCount ?? 0,
        tokensUsed,
        subscriptionStartDate,
        personal_details: user.personal_details || "--",
        isActive: user.isActive ?? false,

        devices: {
          ios: iosCount,
          android: androidCount,
        },

        avatar,
      };
    });

    setRows(mappedRows);
    setUsers(users);
  }, [data]);

  const handleDeleteClick = async (params) => {
    try {
      await deleteUser(params.id).unwrap();
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
      console.error(error);
    }
  };

  const handleToggleStatus = async (params) => {
    try {
      const res = await toggleUserStatus(params.id).unwrap();
      toast.success(res?.message || "Status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      flex: 0.4,
      minWidth: 60,
      sortable: false,
      renderCell: (params) => (
        <Avatar src={params.value} alt={params.row.name} sx={{ width: 32, height: 32 }} />
      ),
    },

    { field: "name", headerName: "Name", flex: 1, minWidth: 140 },
    { field: "email", headerName: "Email", flex: 1.2, minWidth: 160 },

    { field: "age", headerName: "Age", flex: 0.6, minWidth: 80 },

    { field: "gender", headerName: "Gender", flex: 0.8, minWidth: 100 },

    {
      field: "aiAccountCount",
      headerName: "AI Accounts",
      flex: 0.8,
      minWidth: 120,
    },

    // ⭐ TOKENS USED
    {
      field: "tokensUsed",
      headerName: "MonthlyTokens Used",
      flex: 0.9,
      minWidth: 130,
      renderCell: (params) => (
        <Chip label={params.value} size="small" color="secondary" variant="outlined" />
      ),
    },

    // ⭐ SUB START
    {
      field: "subscriptionStartDate",
      headerName: "Subscription Start",
      flex: 1,
      minWidth: 160,
    },

    // ⭐ PERSONAL DETAILS
    {
      field: "personal_details",
      headerName: "Personal Details",
      flex: 1.2,
      minWidth: 180,
      renderCell: (params) => (
        <Tooltip title={params.value || "--"}>
          <Typography noWrap>{params.value || "--"}</Typography>
        </Tooltip>
      ),
    },

    // ⭐ DEVICES
    {
      field: "devices",
      headerName: "Devices",
      flex: 1,
      minWidth: 140,
      renderCell: (params) => (
        <>
          <Chip label={`IOS ${params.row.devices?.ios ?? 0}`} size="small" variant="outlined" />
          <Chip label={`Android ${params.row.devices?.android ?? 0}`} size="small" variant="outlined" />
        </>
      ),
    },

    // ⭐ STATUS
    {
      field: "isActive",
      headerName: "Status",
      flex: 0.8,
      minWidth: 110,
      renderCell: (params) => (
        <Chip
          label={params.value ? "Active" : "Inactive"}
          color={params.value ? "success" : "default"}
          size="small"
          variant="outlined"
        />
      ),
    },

    // ⭐ ACTIONS
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      minWidth: 130,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title={params.row.isActive ? "Deactivate" : "Activate"}>
            <IconButton onClick={() => handleToggleStatus(params.row)} size="small">
              {params.row.isActive ? (
                <CheckCircleIcon fontSize="small" color="success" />
              ) : (
                <CancelIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete User">
            <IconButton onClick={() => handleDeleteClick(params.row)} size="small">
              <DeleteIcon fontSize="small" color="error" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Typography color="error" p={4}>
          Failed to load users
        </Typography>
      ) : (
        <Box p={4}>
          <Box display="flex" alignItems="center" mb={2}>
            <GroupIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h5" fontWeight="bold" color="primary">
              Users List
            </Typography>
          </Box>

          <DataTable users={users} rows={rows} columns={columns} />
        </Box>
      )}
    </>
  );
}
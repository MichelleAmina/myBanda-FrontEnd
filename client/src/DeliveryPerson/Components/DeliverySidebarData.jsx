import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import LogoutIcon from '@mui/icons-material/Logout';
import TaskIcon from '@mui/icons-material/Task';

export const DeliverySidebarData = [
    {
        icon: DashboardIcon,
        title: "Dashboard",
        path: "/driverhomepage"
    },
    {
        icon:   PendingActionsIcon,
        title: "Pending Deliveries",
        path:"/pendingDeliveries"
    },
    {
        icon: TaskIcon,
        title: "Completed deliveries",
        path: "/completedDeliveries"
    },
    {
        icon: AnalyticsIcon,
        title: "Analytics",
        path: "/driverAnalytics"
    },
    // {
    //     icon: SettingsIcon,
    //     title: "Settings",
    //     path: "/driverSettings"
    // },
    {
        icon: LogoutIcon,
        title: "Logout",
        path: "/login"
    },
]
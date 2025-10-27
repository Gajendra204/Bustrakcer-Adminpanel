import { useQuery } from '@tanstack/react-query';
import { getAllBuses } from '../api/buses';
import { getAllDrivers } from '../api/drivers';
import { getAllRoutes } from '../api/routes';
import { getAllStudents } from '../api/student';

export const useDashboard = () => {
  // Fetch Buses Count
  const {
    data: buses = [],
    isLoading: busesLoading,
    error: busesError
  } = useQuery({
    queryKey: ['buses'],
    queryFn: getAllBuses
  });

  // Fetch Drivers Count
  const {
    data: drivers = [],
    isLoading: driversLoading,
    error: driversError
  } = useQuery({
    queryKey: ['drivers'],
    queryFn: getAllDrivers
  });

  // Fetch Routes Count
  const {
    data: routes = [],
    isLoading: routesLoading,
    error: routesError
  } = useQuery({
    queryKey: ['routes'],
    queryFn: getAllRoutes
  });

  // Fetch Students Count
  const {
    data: students = [],
    isLoading: studentsLoading,
    error: studentsError
  } = useQuery({
    queryKey: ['students'],
    queryFn: getAllStudents
  });

  return {
    // Counts
    busCount: buses.length,
    driverCount: drivers.length,
    routeCount: routes.length,
    studentCount: students.length,
    
    loading: busesLoading || driversLoading || routesLoading || studentsLoading,
    busesLoading,
    driversLoading,
    routesLoading,
    studentsLoading,
    
    busesError,
    driversError,
    routesError,
    studentsError,
    
    buses,
    drivers,
    routes,
    students,
  };
};
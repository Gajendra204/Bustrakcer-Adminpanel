import { useQuery } from '@tanstack/react-query';
import { getAllBuses } from '../api/buses';
import { getAllDrivers } from '../api/drivers';
import { getAllRoutes } from '../api/routes';

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

  return {
    // Counts
    busCount: buses.length,
    driverCount: drivers.length,
    routeCount: routes.length,
    
    loading: busesLoading || driversLoading || routesLoading,
    busesLoading,
    driversLoading,
    routesLoading,
    
    busesError,
    driversError,
    routesError,
    
    buses,
    drivers,
    routes,
  };
}; 
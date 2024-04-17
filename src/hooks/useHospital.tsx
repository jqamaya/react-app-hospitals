import {
	PropsWithChildren,
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";

import hospitalData from '../data/hospitals.json';
import { useLocalStorage } from "./useLocalStorage";
import Hospital from '../types/Hospital';

export interface Context {
	hospitals: Hospital[];
	addHospital: (hospital: Hospital, onSuccess: () => void) => void,
	filteredHospitals: Hospital[];
	setFilteredHospitals: (hospitals: Hospital[]) => void,
  isLoading: boolean;
	setLoading: (isLoading: boolean) => void,
}

export const HospitalContext = createContext({
	hospitals: hospitalData,
	addHospital: (hospital: Hospital, onSuccess: () => {}) => {},
	filteredHospitals: hospitalData,
	setFilteredHospitals: (hospitals: Hospital[]) => {},
  isLoading: false,
	setLoading: (isLoading: boolean) => {},
});

export function HospitalProvider({ children }: PropsWithChildren) {
  const [isLoading, setLoading] = useState(false);
	const [hospitals, setHospitals] = useLocalStorage('hospitals', hospitalData);
	const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>(hospitalData);

	const addHospital = useCallback((hospital: Hospital, onSuccess: () => void) => {
		setLoading(true);
		setTimeout(() => {
			setHospitals((oldArray: Hospital[]) => [
				...oldArray,
				hospital
			]);
			setFilteredHospitals((oldArray: Hospital[]) => [
				...oldArray,
				hospital
			]);
			setLoading(false);
			onSuccess();
		}, 3000)
	}, [setHospitals]);

	const value = useMemo(
		() => ({
			hospitals,
			addHospital,
			filteredHospitals,
			setFilteredHospitals,
      isLoading,
			setLoading,
		}),
		[
			hospitals,
			addHospital,
			filteredHospitals,
			setFilteredHospitals,
			isLoading,
			setLoading,
		]
	);

	return (
		<HospitalContext.Provider value={value}>
			{children}
		</HospitalContext.Provider>
	)
};

export const useHospital = () => {
	return useContext(HospitalContext) as Context;
};

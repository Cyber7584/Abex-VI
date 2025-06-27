import { useState, useEffect, useRef } from "react";

const usePersistedFilters = (key) => {
	const [appliedFilters, setAppliedFilters] = useState(() => {
		const savedFilters = localStorage.getItem(key);
		return savedFilters ? JSON.parse(savedFilters) : {};
	});

	const tableRef = useRef();

	const saveFilters = (filters) => {
		setAppliedFilters(filters);
		localStorage.setItem(key, JSON.stringify(filters));
	};

	const resetFilters = () => {
		setAppliedFilters({});
		localStorage.removeItem(key);
		tableRef.current.resetFilters();
	};

	useEffect(() => {
		return () => {
			localStorage.removeItem(key);
		};
	}, [key]);

	return {
		appliedFilters,
		saveFilters,
		resetFilters,
		tableRef,
	};
};

export default usePersistedFilters;

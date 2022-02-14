export const loadState = () => {
	try {
		const serializedState:string = localStorage.getItem('state') as string;
		if(serializedState === null) return undefined;
		return JSON.parse(serializedState);
	} catch(e) {
		return undefined;
	}
}

export const saveState = (state:any) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('state', serializedState);
	} catch(e) {
		// Ignore
	}
}
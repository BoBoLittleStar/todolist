export type Item = {
	task: string,
	checked: boolean,
}

export type State =
	{
		ids: string[],
		count: number,
		items: {
			[id: string]: Item,
		},
	}

export const initialState: State = {
	ids: [],
	count: 0,
	items: {},
};
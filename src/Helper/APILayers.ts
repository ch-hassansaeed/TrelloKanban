import { ApiMockResponse } from "../ApiMockData/dummyData";
import { IBoard } from "../Interfaces/Kanban";

const LocalStorageKeyName = "kanban-boards";
//Data Layer
export class BoardAPI {
  async fetchBoardList(): Promise<IBoard[]> {
    const apiData: IBoard[] = ApiMockResponse;
    let BoardList: IBoard[] = [];
    //first check local storage if local storage is empty then add api mock data as seed
    if (localStorage.getItem(LocalStorageKeyName)) {
      const localStorageData: IBoard[] = JSON.parse(
        localStorage.getItem(LocalStorageKeyName) ?? "",
      );
      BoardList = [...localStorageData];
    } else {
      BoardList = [...apiData];
      updateLocalStorageBoards(BoardList);
    }

    return BoardList;
    //TODO:integrate API module when got API from backend team :)
    /*
      private readonly api = new Api();//it will have all Restful verbs functions
      return axios.get(`ENDPOINT_GOES_HERE`)
      .then((res: { data: any; }) => {
        return res.data;
      });
      */
  }
} //BoardAPI Class End

//Business Layer
export async function fetchBoardList(): Promise<IBoard[]> {
  const api = new BoardAPI();
  return api.fetchBoardList();
}
export function updateLocalStorageBoards(boards: IBoard[]) {
  localStorage.setItem(LocalStorageKeyName, JSON.stringify(boards));
}

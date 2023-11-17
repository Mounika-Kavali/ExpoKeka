import axios from "axios";
import { HTTP_GET, HTTP_POST, HTTP_PATCH } from './http-const';
import {GET_STARTED_BUTTON} from './action-types'


export const getStartedButtonClicked = () => ({
    type: GET_STARTED_BUTTON,
  });
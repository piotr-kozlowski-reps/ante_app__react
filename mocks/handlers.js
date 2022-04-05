import { rest } from "msw";

export const handlers = [
  //login
  rest.post(
    `${process.env.REACT_APP_BACKEND_URL}api/login`,
    (req, res, ctx) => {
      localStorage.setItem("userData", {
        login: "PEgaz",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6IlBFZ2F6IiwiaWQiOiI2MjQ0MGMxMGJhMWM1YjAwNjhhMzlmOTgiLCJpYXQiOjE2NDkxODAzNjIsImV4cCI6MTY0OTE4Mzk2Mn0.yPDaG8nf1zOm6rhlTe8VbdSpWaDBtpABppK8I_eolc8",
        expiration: "2022-04-05T18:39:22.603Z",
      });

      return res(
        ctx.status(200),
        ctx.json({
          userId: "62440c10ba1c5b0068a39f98",
          login: "PEgaz",
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6IlBFZ2F6IiwiaWQiOiI2MjQ0MGMxMGJhMWM1YjAwNjhhMzlmOTgiLCJpYXQiOjE2NDkxODAzNjIsImV4cCI6MTY0OTE4Mzk2Mn0.yPDaG8nf1zOm6rhlTe8VbdSpWaDBtpABppK8I_eolc8",
        })
      );
    }
  ),
];

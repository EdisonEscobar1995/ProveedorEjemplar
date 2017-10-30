package Nutresa.ExemplaryProvider.API;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//public class TestAPI extends BaseAPI {
//
//    private static final long serialVersionUID = 2L;
//
//    public void rrr() {
//
//    }
//}

public class TestAPI extends BaseAPI {

    public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        PrintWriter out = res.getWriter();

        // TestAPI t = new TestAPI();

        // t.class.getMethod("qq", "ggg");

        String username = req.getParameter("username");
        String password = req.getParameter("password");
        if (username == null || password == null) {
            out.println("Miss parameter username or password");
        } else {
            if (username.trim().equals("admin") && password.trim().equals("admin")) {
                out.println("Login Success");
            } else
                out.println("Login Failure");
        }
         

        out.close();
    }

}
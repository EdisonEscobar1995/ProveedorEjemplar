package Nutresa.ExemplaryProvider.DTL;

import com.google.gson.annotations.Expose;

public class NewDTO {
    @Expose
    public String a;

    @Expose
    public int b;

    @Expose
    public float c;

    @Expose
    public String d;

    public String e;

    public NewDTO(String a, int b, float c, String d, String e) {
        super();
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.e = e;
    }
}

package Nutresa.ExemplaryProvider.DTL;

import com.google.gson.annotations.Expose;

public class NewDTO {
    @Expose
    protected String a;

    @Expose
    protected int b;

    @Expose
    protected float c;

    @Expose
    protected String d;

    @Expose
    protected String[] e;

    public NewDTO(String a, int b, float c, String d, String[] e) {
        super();
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.e = e;
    }
}

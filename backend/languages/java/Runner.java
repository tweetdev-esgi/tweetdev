import java.nio.file.*;
import java.io.*;

public class Runner {
    public static void main(String[] args) throws IOException {
        String code = new String(Files.readAllBytes(Paths.get("/app/Code.java")));
        System.out.println("Running Java code:");
        System.out.println(code);
    }
}

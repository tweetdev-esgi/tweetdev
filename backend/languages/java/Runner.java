import java.nio.file.*;
import java.io.*;

public class Runner {
    public static void main(String[] args) {
        try {
            String code = new String(Files.readAllBytes(Paths.get("/app/Code.java")));
            Files.write(Paths.get("/app/Temp.java"), code.getBytes());
            Process compileProcess = Runtime.getRuntime().exec("javac /app/Temp.java");
            compileProcess.waitFor();
            Process runProcess = Runtime.getRuntime().exec("java -cp /app Temp");
            BufferedReader in = new BufferedReader(new InputStreamReader(runProcess.getInputStream()));
            String line;
            while ((line = in.readLine()) != null) {
                System.out.println(line);
            }
            in.close();
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}

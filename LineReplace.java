import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

import java.io.FileWriter;
import java.io.BufferedWriter;
import java.io.PrintWriter;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class LineReplace {

  public static void main(String[] args) {

    Path path = Paths.get("./Merchant.java");
    try (Stream<String> lines = Files.lines(path)) 
    {
      lines
      .map(n -> {
          # /*  41 */     return merchant; 
          Pattern r = Pattern.compile("^\\/\\*.*\\*\\/");
          Matcher m = r.matcher(n);
          if (m.find()) {
             return m.replaceFirst("");
          } else {
             return n;
          }

      })
      .forEach(n -> {

          try(PrintWriter out = new PrintWriter(new BufferedWriter(new FileWriter("./new.java", true)))) {
            out.println(n);
          }catch (IOException ee) {
            ee.printStackTrace();
          }

      });
    } 
    catch (IOException e) 
    {
      e.printStackTrace();
    }

  }
}

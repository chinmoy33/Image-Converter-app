import java.awt.Color;
public class Pixel {
    int red, green, blue;

    public Pixel(int r, int g, int b) {
        this.red = r;
        this.green = g;
        this.blue = b;
    }

    public Pixel getNegative(){
        return new Pixel(255-this.red,255-this.green,255-this.blue);
    }

    public int toRGB() {
        Color color = new Color(this.red, this.green, this.blue);  // Create Color object
        return color.getRGB();  // Returns combined RGB integer
    }
}

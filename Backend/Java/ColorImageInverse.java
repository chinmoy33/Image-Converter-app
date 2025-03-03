import java.awt.Color;
import java.awt.image.BufferedImage;
import java.io.File;
import javax.imageio.ImageIO;

public class ColorImageInverse {

    public static void saveBinaryMatrixAsImage(Pixel[][] binaryMatrixInverse, String outputPath) {
        int height = binaryMatrixInverse.length;
        int width = binaryMatrixInverse[0].length;

        // Create a BufferedImage with the same width & height
        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);

        // Set pixels based on the binary matrix
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                int color = binaryMatrixInverse[y][x].toRGB();
                image.setRGB(x, y, color);
            }
        }

        // Save image to the specified path
        try {
            File outputFile = new File(outputPath);
            ImageIO.write(image, "png", outputFile);
            System.out.println("Image saved successfully: " + outputPath);
        } catch (Exception e) {
            System.out.println("Error saving the image: " + e.getMessage());
        }
    }
    public static void main(String[] args) {
        if (args.length != 1) {
            System.out.println("Usage: java JpegToMatrix <image.jpg>");
            return;
        }

        String filePath = args[0];
        try {
            BufferedImage image = ImageIO.read(new File(filePath));
            if (image == null) {
                System.out.println("Invalid image file.");
                return;
            }

            int width = image.getWidth();
            int height = image.getHeight();
            Pixel[][] binaryMatrix = new Pixel[height][width];
            Pixel[][] binaryMatrixInverse = new Pixel[height][width];

            //System.out.println("Binary Representation of the Image:");
            for (int y = 0; y < height; y++) {
                for (int x = 0; x < width; x++) {
                    Color color = new Color(image.getRGB(x, y));
                    // int grayscale = (color.getRed() + color.getGreen() + color.getBlue()) / 3; // Convert to grayscale
                    binaryMatrix[y][x]= new Pixel(color.getRed(),color.getGreen(),color.getBlue());
                    binaryMatrixInverse[y][x]=binaryMatrix[y][x].getNegative();
                    //System.out.print(binaryMatrix[y][x]+" ");
                }
                //System.out.println();
            }

            String outputPath="./output/original.png";
            String outputPathInverse="./output/originalInverse.png";
            
            saveBinaryMatrixAsImage(binaryMatrixInverse, outputPathInverse);



        } catch (Exception e) {
            System.out.println("Error reading the image: " + e.getMessage());
        }
    }
}

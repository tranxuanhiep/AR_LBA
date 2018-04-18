package com.ar_lba.model;

/**
 * Created by hilbert on 05/04/2018.
 */
import android.location.Location;
public class ARPoint {
    Location location;
    String name;
    String ID;
    double rate;
    String address;
    String distance;
    double altitude;
    int numberView;
    public ARPoint(String ID,String name,String address,String distance,double rate, double lat, double lon,int numberView, double altitude) {
        this.ID = ID;
        this.name = name;
        this.rate = rate;
        this.address = address;
        this.distance = distance;
        this.altitude = altitude;
        this.numberView = numberView;
        location = new Location("ARPoint");
        location.setLatitude(lat);
        location.setLongitude(lon);
        location.setAltitude(altitude);

    }

    public Double getAltitude(){
        return altitude;
    }

    public Location getLocation() {
        return location;
    }

    public String getName() {
        return name;
    }

    public String getID(){ return ID; }

    public double getRate(){return rate;}

    public String getAddress(){return address;}

    public String getDistance(){return distance;}

    public int getNumberView(){return numberView;}
}


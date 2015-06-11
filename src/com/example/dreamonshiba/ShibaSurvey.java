package com.example.dreamonshiba;
import org.apache.cordova.DroidGap;
import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;

public class ShibaSurvey extends DroidGap {

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		 super.loadUrl("file:///android_asset/www/index.html");
	}	

}

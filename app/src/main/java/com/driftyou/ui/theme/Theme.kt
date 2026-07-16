package com.driftyou.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val DriftColorScheme = darkColorScheme(
    primary = Color(0xFF4ED8FF),
    secondary = Color(0xFF8B80FF),
    tertiary = Color(0xFF3EDB7E),
    background = Color(0xFF0B1024),
    surface = Color(0xFF131B38)
)

@Composable
fun DriftYouTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = DriftColorScheme,
        typography = Typography,
        content = content
    )
}

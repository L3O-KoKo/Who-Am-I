package com.driftyou

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.FilterChip
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Slider
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewmodel.compose.viewModel
import com.driftyou.ui.theme.DriftYouTheme
import kotlinx.coroutines.delay

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            DriftYouTheme {
                DriftYouApp()
            }
        }
    }
}

enum class MovementMode(val label: String, val speedMultiplier: Float, val tint: Color) {
    Car("Car", 2.0f, Color(0xFF00C2FF)),
    Bicycle("Bicycle", 1.25f, Color(0xFF21D07A)),
    Walking("Walking", 0.8f, Color(0xFFFF9E44))
}

enum class MapStyle { Road, Satellite }

data class RoutePoint(val x: Float, val y: Float)

class DriftYouViewModel : ViewModel() {
    var startPoint by mutableStateOf<RoutePoint?>(null)
        private set
    var endPoint by mutableStateOf<RoutePoint?>(null)
        private set
    var progress by mutableFloatStateOf(0f)
        private set
    var isSimulating by mutableStateOf(false)
        private set
    var mode by mutableStateOf(MovementMode.Car)
        private set
    var speed by mutableFloatStateOf(1f)
        private set
    var mapStyle by mutableStateOf(MapStyle.Road)
        private set

    fun placePoint(point: RoutePoint) {
        when {
            startPoint == null -> startPoint = point
            endPoint == null -> endPoint = point
            else -> {
                startPoint = point
                endPoint = null
                progress = 0f
                isSimulating = false
            }
        }
    }

    fun setMode(newMode: MovementMode) {
        mode = newMode
    }

    fun setSpeed(value: Float) {
        speed = value
    }

    fun toggleMapStyle() {
        mapStyle = if (mapStyle == MapStyle.Road) MapStyle.Satellite else MapStyle.Road
    }

    fun startSimulation() {
        if (startPoint != null && endPoint != null) {
            progress = 0f
            isSimulating = true
        }
    }

    fun tick() {
        if (!isSimulating) return
        val step = 0.0045f * speed * mode.speedMultiplier
        progress = (progress + step).coerceAtMost(1f)
        if (progress >= 1f) {
            isSimulating = false
        }
    }

    fun reset() {
        progress = 0f
        isSimulating = false
        startPoint = null
        endPoint = null
    }
}

@Composable
private fun DriftYouApp(vm: DriftYouViewModel = viewModel()) {
    LaunchedEffect(vm.isSimulating, vm.speed, vm.mode) {
        while (vm.isSimulating) {
            vm.tick()
            delay(16)
        }
    }

    val bg = if (vm.mapStyle == MapStyle.Road) {
        Brush.verticalGradient(listOf(Color(0xFF0E1630), Color(0xFF1C355E)))
    } else {
        Brush.verticalGradient(listOf(Color(0xFF232526), Color(0xFF414345)))
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Drift You", fontWeight = FontWeight.Bold) },
                actions = {
                    Text(
                        text = if (vm.mapStyle == MapStyle.Road) "Road" else "Satellite",
                        modifier = Modifier
                            .padding(end = 16.dp)
                            .clickable { vm.toggleMapStyle() },
                        color = MaterialTheme.colorScheme.primary
                    )
                }
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .padding(padding)
                .fillMaxSize()
                .background(bg)
                .padding(16.dp)
                .verticalScroll(rememberScrollState()),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Text(
                text = "Tap map to place Start and End points. Third tap restarts route.",
                color = Color.White.copy(alpha = 0.88f)
            )

            Card(colors = CardDefaults.cardColors(containerColor = Color(0x33000000))) {
                MockMap(
                    start = vm.startPoint,
                    end = vm.endPoint,
                    progress = vm.progress,
                    mapStyle = vm.mapStyle,
                    mode = vm.mode,
                    onMapTap = vm::placePoint
                )
            }

            ModeSelector(vm.mode, vm::setMode)

            Card(colors = CardDefaults.cardColors(containerColor = Color(0x26000000))) {
                Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text("Movement speed", color = Color.White)
                    Slider(
                        value = vm.speed,
                        onValueChange = vm::setSpeed,
                        valueRange = 0.4f..3.5f
                    )
                    Text(String.format("%.1fx", vm.speed), color = Color.White.copy(alpha = 0.8f))
                }
            }

            Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                Button(onClick = vm::startSimulation, enabled = vm.startPoint != null && vm.endPoint != null) {
                    Text(if (vm.isSimulating) "Running..." else "Start Simulation")
                }
                Button(onClick = vm::reset) { Text("Reset") }
            }
        }
    }
}

@Composable
private fun ModeSelector(selected: MovementMode, onSelect: (MovementMode) -> Unit) {
    Card(colors = CardDefaults.cardColors(containerColor = Color(0x26000000))) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            MovementMode.entries.forEach { mode ->
                FilterChip(
                    selected = selected == mode,
                    onClick = { onSelect(mode) },
                    label = { Text(mode.label) }
                )
            }
        }
    }
}

@Composable
private fun MockMap(
    start: RoutePoint?,
    end: RoutePoint?,
    progress: Float,
    mapStyle: MapStyle,
    mode: MovementMode,
    onMapTap: (RoutePoint) -> Unit
) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .height(380.dp)
            .pointerInput(Unit) {
                awaitPointerEventScope {
                    while (true) {
                        val event = awaitPointerEvent()
                        val press = event.changes.firstOrNull() ?: continue
                        if (press.pressed) {
                            onMapTap(RoutePoint(press.position.x, press.position.y))
                        }
                    }
                }
            }
    ) {
        Canvas(Modifier.fillMaxSize()) {
            val roadColor = if (mapStyle == MapStyle.Road) Color(0xFF24395E) else Color(0xFF3D444B)
            val stripeColor = if (mapStyle == MapStyle.Road) Color(0x664ED8FF) else Color(0x55FFFFFF)

            for (i in 1..6) {
                drawLine(
                    color = stripeColor,
                    start = Offset(0f, size.height / 7f * i),
                    end = Offset(size.width, size.height / 7f * i),
                    strokeWidth = 2f
                )
            }
            for (j in 1..5) {
                drawLine(
                    color = stripeColor,
                    start = Offset(size.width / 6f * j, 0f),
                    end = Offset(size.width / 6f * j, size.height),
                    strokeWidth = 2f
                )
            }
            drawRect(roadColor.copy(alpha = 0.30f))

            if (start != null) drawCircle(Color(0xFF3EDB7E), radius = 12f, center = Offset(start.x, start.y))
            if (end != null) drawCircle(Color(0xFFFF5F73), radius = 12f, center = Offset(end.x, end.y))

            if (start != null && end != null) {
                val path = Path().apply {
                    moveTo(start.x, start.y)
                    val c1 = Offset((start.x + end.x) / 2f, start.y - 150f)
                    val c2 = Offset((start.x + end.x) / 2f, end.y + 150f)
                    cubicTo(c1.x, c1.y, c2.x, c2.y, end.x, end.y)
                }

                drawPath(path, color = mode.tint, style = Stroke(width = 8f, cap = StrokeCap.Round))

                val moving = bezierPoint(start, end, progress)
                drawCircle(color = mode.tint, radius = 16f, center = moving)
            }
        }
    }
}

private fun bezierPoint(start: RoutePoint, end: RoutePoint, t: Float): Offset {
    val c1 = Offset((start.x + end.x) / 2f, start.y - 150f)
    val c2 = Offset((start.x + end.x) / 2f, end.y + 150f)
    val u = 1 - t
    val x = u * u * u * start.x + 3 * u * u * t * c1.x + 3 * u * t * t * c2.x + t * t * t * end.x
    val y = u * u * u * start.y + 3 * u * u * t * c1.y + 3 * u * t * t * c2.y + t * t * t * end.y
    return Offset(x, y)
}
